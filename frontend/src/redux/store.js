import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
   
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE, 
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import plantInfoSlice from "./productDetailSlice.js"
import plantsSlice from "./plantsSlice.js";
import cartSlice, { setCart } from "./cartSlice.js";
import userSlice from "./userSlice.js";
import conSlice from "./conSlice.js";
import ownPlantSlice from "./ownPlantSlice.js";
import editPlantSlice from "./editPlantSlice.js";
import ordersSlice from "./ordersSlice.js";
import loaderSlice from "./loaderSlice.js";

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({

    plantInfo: plantInfoSlice,
    plants: plantsSlice,
    cart: cartSlice,
    user: userSlice,
    con: conSlice,
    ownPlants: ownPlantSlice,
    selectedEdit: editPlantSlice,
    orders: ordersSlice,
    load: loaderSlice
   
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  const store  = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export default store