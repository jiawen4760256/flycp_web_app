import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    homeList: {notice:"",list:[],img:[],kefu:"",checkCode:"",appUrl:[]},
    k3Wanfa: [],
    k3Touzhu: {},
    loading:false
  },
  reducers: {
    setHomeList: (state, action) => {
      state.homeList = action.payload
    },
    setKsWanfa: (state, action) => {
      state.k3Wanfa = action.payload
    },
    setKsTouzhu: (state, action) => {
      state.k3Touzhu = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },


  },
})

export const { setHomeList,setKsWanfa, setKsTouzhu,setLoading} = counterSlice.actions
export const getHomeList = (state:any) => state.counter.homeList
export const getK3Wanfa = (state:any) => state.counter.k3Wanfa
export const getk3Touzhu = (state:any) => state.counter.k3Touzhu
export const getLoading = (state:any) => state.counter.loading

export default counterSlice.reducer