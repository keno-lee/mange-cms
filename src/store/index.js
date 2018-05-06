import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

function getCarts() {  
    let data =  JSON.parse(localStorage.getItem("carts"));
    if (data == null || data.length == 0){
        return [];
    }else {
        return data;
    }
}

function saveCarts(value) {
    localStorage.setItem("carts",JSON.stringify(value));
}


export default new Vuex.Store({
    state: {
        carts: getCarts()
    },
    getters: {
        getId:state=>{
            return state.carts.map(v => {
                return v.id;
            }).join(",");
        },
        getCountById:state=>{
            return id => {
                var temp = state.carts.find(v => {
                    return v.id == id;
                });
                return temp.count;
            }
        },
        totalCount:state => {
            var total = 0;
            state.carts.forEach(v => {
                return total+=v.count
            });
            return total;
        }
    },
    mutations: {
        addToCarts(state, cart){
            //添加一条数据{id: xx, count: yy}
            let data = state.carts.find(v => {
                return v.id == cart.id;
            });
            if (data){
                // 如果data存在.说明有这个数据
                // 那么更新即可
                data.count += cart.count;
            }else {
                state.carts.push(cart);
            }
            // 存储
            saveCarts(state.carts);
        },
        updateToCarts(state, cartsList){
            // 首先获取现有的数据,遍历,然后更新数据
            cartsList.forEach(v => {
                var temp = state.carts.find(e => {
                    return e.id == v.id;
                });
                temp.count = v.count;
            });
            saveCarts(state.carts); 
        }
    }
})