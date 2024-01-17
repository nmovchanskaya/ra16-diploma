import './App.css';
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { InformationPage } from './pages/InformationPage';
import { CatalogContent } from './pages/CatalogContent';
import { ProductContent } from './pages/ProductContent';
import { AboutContent } from './pages/AboutContent';
import { ContactsContent } from './pages/ContactsContent';
import { Page404Content } from './pages/Page404Content';
import { CartContent } from './pages/CartContent';
import { Header } from './widgets/Header';
import { createRequest } from './shared/api/createRequest';
import { TopSales } from './widgets/TopSales';
import { CartItem } from './entities/cartItem/model/CartItem';

function App() {

  const categoriesUrl = 'http://localhost:7070/api/categories';
  const getCategories = (callback: any) => {
    createRequest({
      url: categoriesUrl,
      sendMethod: 'GET',
      callback
    });
  }

  const topSalesUrl = 'http://localhost:7070/api/top-sales';
  const getTopSales = (callback: any) => {
    createRequest({
      url: topSalesUrl,
      sendMethod: 'GET',
      callback
    });
  }
   
  const getProducts = (url: string, callback: any) => {
    createRequest({
      url,
      sendMethod: 'GET',
      callback
    });
  }

  const initUrlItems = 'http://localhost:7070/api/items';
  const urlOrder = 'http://localhost:7070/api/order';

  const [curProducts, setProducts] = useState([]);
  const [urlItems, setUrlItems] = useState(initUrlItems);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [curProduct, setProduct] = useState(undefined);
  const [curOffset, setCurOffset] = useState(1);
  const [topSales, setTopSales] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [cartQty, setCartQty] = useState(0);
  const [searchHeaderState, setSearchHeaderState] = useState(0);

  const navigate = useNavigate();

  const filterProducts = (category: number) => {
    //get search sequence
    let searchSeq = '';
    let idx;
    if (urlItems.indexOf('q=') > 0) {
      idx = urlItems.substring(urlItems.indexOf('q=')).indexOf('&');
      if (idx > 0) {
        searchSeq = urlItems.substring(urlItems.indexOf('q=')+2, urlItems.indexOf('q=')+idx);
      }
      else {
        searchSeq = urlItems.substring(urlItems.indexOf('q=')+2);
      }
    }

    let newUrl = '';
    if (category) {
      newUrl = initUrlItems + '?categoryId=' + category;
      if (searchSeq.length) {
        newUrl += '&q=' + searchSeq;
      }
      setUrlItems(newUrl);
    }
    else {
      newUrl = initUrlItems;
      if (searchSeq.length) {
        newUrl += '?q=' + searchSeq;
      }
      setUrlItems(newUrl);
    }
    setActiveCategory(category);
    setCurOffset(1);
  }

  const loadMore = (offset: number) => {
    if (urlItems.indexOf('offset') > 0) {
      setUrlItems(urlItems.substring(0, urlItems.indexOf('offset')) + 'offset=' + offset);
    }
    else if (urlItems.indexOf('?') > 0) {
      setUrlItems(urlItems + '&offset=' + offset);
    }
    else {
      setUrlItems(urlItems + '?offset=' + offset);
    }
    setCurOffset(curOffset + 1);
  }

  const initialSearchState = {
    text: ''
  }
  const [searchForm, setSearchForm] = useState(initialSearchState);

  const searchSubmit = (event?: any) => {

    if (event) {
      event.preventDefault();
    }

    const searchSeq = searchForm.text;
    const category = activeCategory;

    let newUrl = '';
    if (category) {
      newUrl = initUrlItems + '?categoryId=' + category;
      if (searchSeq.length) {
        newUrl += '&q=' + searchSeq;
      }
    }
    else {
      newUrl = initUrlItems;
      if (searchSeq.length) {
        newUrl += '?q=' + searchSeq;
      }
    }
    setUrlItems(newUrl);
    setCurOffset(1);
  }

  const [searchHeaderForm, setSearchHeaderForm] = useState(initialSearchState);

  const clickSearchHeader = () => {

    //if first click - expand search input
    if (searchHeaderState === 0) {
      setSearchHeaderState(1);
    }
    //if second click - redirect to catalog and show search results
    else if (searchHeaderState === 1) {
      setSearchHeaderState(0);

      if (searchHeaderForm.text) {
        navigate('/catalog');
        setSearchForm({text: searchHeaderForm.text});

        searchSubmit();
      }
    }
  }

  const addToCart = (id: number, title: string, size: string, price: number, qty: number) => {

    const keyString = localStorage.getItem('maxKey');
    let key: any;

    if (keyString) {
      key = Number(keyString);
    }
    else {
      key = 1;
    }

    //add item to cartItems
    setCartItems((prevItems: any) => {
      prevItems.push({key, id, title, size, price, qty});
      console.log(prevItems);
      return prevItems;
    });
    
    //save in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    key++;
    localStorage.setItem("maxKey", key.toString());
  }

  const deleteItem = (id: number, size: string) => {
    setCartItems((prevItems: any) => {
      let itemsNew = prevItems.filter((item: CartItem) => item.id !== id || item.size !== size);

      let items: CartItem[] = [];
      let key = 1;
      itemsNew.forEach((item: CartItem) => {
        items.push({key, "id": item.id, "title": item.title, "size": item.size, "price": item.price, "qty": item.qty});
        key++;
      });

      localStorage.setItem('cartItems', JSON.stringify(items));
      localStorage.setItem('maxKey', key.toString());

      prevItems = items;
      return prevItems;
    });
  }

  const initialState = {
    phone: '',
    address: '',
    agreement: false
  }
  const [form, setForm] = useState(initialState);

  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault();

    let items: { id: number; price: number; count: number; }[] = [];
    cartItems.forEach((item: CartItem) => {
      items.push({"id": item.id, "price": item.price, "count": item.qty});
    });

    const data = {
        "owner": {
          "phone": form.phone,
          "address": form.address,
        },
        "items": items
    };

    const callback = (data: any) => {

      //clean cart state 
      setCartItems([]);
      setCartQty(0);

      //clean localStorage
      localStorage.removeItem('cartItems');
      localStorage.removeItem('maxKey');
    }

    //send Post Request to submit the order on the server
    createRequest({
      url: urlOrder,
      sendMethod: 'POST',
      data,
      callback
    });

    setForm(initialState);
  }
  
  //get all the products for the first time
  //get filteres products when urlItems is changed
  useEffect(() => {
    const resp = getProducts(urlItems, (data: any) => {
      setProducts(data);
    })

    return () => {}
  }, [urlItems]);

  //get all the categories for the first time
  useEffect(() => {
    const resp = getCategories((data: any) => {
      setCategories(data);
    })

    return () => {}
  }, []);

  //get top sales for the first time
  useEffect(() => {
    const resp = getTopSales((data: any) => {
      if (data.length) {
        setTopSales(data);
      }
    })

    return () => {}
  }, []);

  //get cartItems from localStorage
  useEffect(() => {
    const itemsString = localStorage.getItem('cartItems');
    if (itemsString) {
      const items = JSON.parse(itemsString);
      setCartItems(items);
      setCartQty(items.length);
    }

    return () => {}
  }, []);

  return (
    <Routes>
      <Route path='/' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <TopSales topSales={topSales}/>
          <CatalogContent 
            main={true} 
            activeCategory={activeCategory} 
            categories={categories} 
            products={curProducts} 
            filterProducts={filterProducts} 
            loadMore={loadMore} 
            curOffset={curOffset} 
            searchSubmit={searchSubmit}
            setSearchForm={setSearchForm}
            searchForm={searchForm}
          />
        </InformationPage>
      }/>
      <Route path='/about' element={
        <InformationPage 
          cartQty={cartQty} 
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <AboutContent/>
        </InformationPage>
      }/>
      <Route path='/contacts' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <ContactsContent/>
        </InformationPage>
      }/>
      <Route path='/catalog' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <CatalogContent 
            main={false} 
            activeCategory={activeCategory} 
            categories={categories} 
            products={curProducts} 
            filterProducts={filterProducts} 
            loadMore={loadMore} 
            curOffset={curOffset} 
            searchSubmit={searchSubmit}
            setSearchForm={setSearchForm}
            searchForm={searchForm}
          />
        </InformationPage>
      }/>
      <Route path='/catalog/:id' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <ProductContent 
            product={curProduct} 
            setProduct={setProduct} 
            addToCart={addToCart}
          />
        </InformationPage>
      }/>
      <Route path='/cart' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <CartContent 
            cartItems={cartItems} 
            setForm={setForm} 
            form={form} 
            submitOrder={submitOrder} 
            deleteItem={deleteItem}/>
        </InformationPage>
      }/>
      <Route path='*' element={
        <InformationPage 
          cartQty={cartQty}
          searchHeaderState={searchHeaderState}
          searchHeaderForm={searchHeaderForm}
          setSearchHeaderForm={setSearchHeaderForm}
          clickSearchHeader={clickSearchHeader}
        >
          <Page404Content/>
        </InformationPage>
      }/>
    </Routes>
  );
}

export default App;
