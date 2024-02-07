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
import { createRequest } from './shared/api/createRequest';
import { TopSales } from './widgets/TopSales';
import { CartItem } from './entities/cartItem/model/CartItem';
import { HeaderContext } from './shared/contexts/HeaderContext';
import { showMessage } from './features/showMessage';

function App() {

  let urlServer = '';
  let websiteUrl;

  if (process.env.NODE_ENV === 'development') {
    urlServer = 'http://localhost:7070';
    websiteUrl = 'http://localhost:3000';
  }
  else {
    urlServer = 'https://ra16-diploma-backend.onrender.com';
    websiteUrl = 'https://nmovchanskaya.github.io/ra16-diploma';
  }

  const categoriesUrl = urlServer + '/api/categories';
  const getCategories = (callback: any) => {
    createRequest({
      url: categoriesUrl,
      sendMethod: 'GET',
      callback
    });
  }

  const topSalesUrl = urlServer + '/api/top-sales';
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

  const initUrlItems = urlServer + '/api/items';
  const urlOrder = urlServer + '/api/order';

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
  const [preLoaderStatus, setPreLoaderStatus] = useState(true);

  const navigate = useNavigate();

  //filter products by category
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
    }
    else {
      newUrl = initUrlItems;
      if (searchSeq.length) {
        newUrl += '?q=' + searchSeq;
      }
    }

    setUrlItems(newUrl);
    setActiveCategory(category);
    setCurOffset(1);
  }

  //load more products
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

  //search form submit
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

  //click over search header form handler
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

  //add Product to the Cart
  const addToCart = (id: number, title: string, size: string, price: number, qty: number) => {

    let added = false;
    cartItems.forEach((item: CartItem) => {
      if (item.id === id && item.size === size) {
        item.qty += qty;
        added = true;
      }
    });
    
    if (added) {return;}

    const keyString = localStorage.getItem('maxKey');
    let key: number;

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

    setCartQty(cartItems.length);
    
    //save in localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    key++;
    localStorage.setItem("maxKey", key.toString());
  }

  //delete Product from the Cart
  const deleteItem = (id: number, size: string) => {
    setCartItems((prevItems: CartItem[]) => {
      let itemsNew = prevItems.filter((item: CartItem) => item.id !== id || item.size !== size);

      //create new items array with new keys
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

  //submit order form
  const submitOrder = (event: React.FormEvent) => {
    event.preventDefault();

    if (form.agreement && form.phone && form.address) {

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

      //show message about the order
      showMessage('Thanks for your order!');

      //send Post Request to submit the order on the server
      createRequest({
        url: urlOrder,
        sendMethod: 'POST',
        data,
        callback
      });

      setForm(initialState);
    }
    else {
      showMessage('Please fill in all the fields');
    }
  }
  
  //get all the products for the first time
  //get filtered products when urlItems is changed
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
        setPreLoaderStatus(false);
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
    <HeaderContext.Provider value={{cartQty, searchHeaderState, searchHeaderForm, setSearchHeaderForm, clickSearchHeader, websiteUrl}}>
      <Routes>
        <Route path='/' element={
          <InformationPage>
            <TopSales topSales={topSales} preLoaderStatus={true}/>
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
          <InformationPage>
            <AboutContent/>
          </InformationPage>
        }/>
        <Route path='/contacts' element={
          <InformationPage>
            <ContactsContent/>
          </InformationPage>
        }/>
        <Route path='/catalog' element={
          <InformationPage>
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
          <InformationPage>
            <ProductContent 
              product={curProduct} 
              setProduct={setProduct} 
              addToCart={addToCart}
              urlServer={urlServer}
            />
          </InformationPage>
        }/>
        <Route path='/cart' element={
          <InformationPage>
            <CartContent 
              cartItems={cartItems} 
              setForm={setForm} 
              form={form} 
              submitOrder={submitOrder} 
              deleteItem={deleteItem}/>
          </InformationPage>
        }/>
        <Route path='*' element={
          <InformationPage>
            <Page404Content/>
          </InformationPage>
        }/>
      </Routes>
    </HeaderContext.Provider>
    );
}

export default App;
