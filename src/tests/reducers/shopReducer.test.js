import { saveArticles, saveCategories, addProductToCart, removeProductToCart, incrementCartQuantity, decrementCartQuantity } from "../../actions/shop";
import shopReducer from "../../reducers/shopReducer";

describe('Reducers / shop', () => {

//part 1 : Structure
   describe('Structure', () => {
       
    //Test 1 Structure: reducer is a function
       test('it is a Function', () => {
        expect(typeof shopReducer).toBe('function');
       });
   });

 //part 2 : Execution  
   describe('Execution', () => {
   

        //Test 2 action SAVE_ARTICLES
        test('it handle correctly SAVE_ARTICLES action', () => {

            const fakeProducts = [{ title: "product 1"}, {title: "product 2"}]

            const stateBefore = {
                products: [{before: "test"}],
                categories: [],
            };

            const stateAfter = {
                products: fakeProducts,
                categories: [],
            };

            const saveArticlesAction = saveArticles(fakeProducts)

            expect(shopReducer(stateBefore, saveArticlesAction)).toEqual(stateAfter)

        });

        //Test 3 action SAVE_CATEGORIES
        test('it handle correctly SAVE_CATEGORIES action', () => {

            const fakeCategories = [{ category: "cat 1", type_of_product: true}, {category: "cat 2"}]

            const stateBefore = {
                categories: [{before: "test"}],
            };

            const stateAfter = {
                categories: fakeCategories.filter(category => category.type_of_product === true ),
            };

            const saveCategoriesAction = saveCategories(fakeCategories)

            expect(shopReducer(stateBefore, saveCategoriesAction)).toEqual(stateAfter)

        });


        //Test 4 action ADD_PRODUCT_TO_CART
        test('it handle correctly ADD_PRODUCT_TO_CART', () => {

            const fakeProduct = {name: "product", description: "description", price: "10 €"}
            const quantity = { quantity : 1 }
            
            const stateBefore = {
                cart : [],
            };

            const stateAfter = {
                cart: [Object.assign(fakeProduct,quantity)],
            };

            const addProductAction = addProductToCart(fakeProduct);

            expect(shopReducer(stateBefore, addProductAction)).toEqual(stateAfter)

        });



        //Test 5 action REMOVE_PRODUCT_FROM_CART
        test('it handle correctly REMOVE_PRODUCT_FROM_CART', () => {

            const fakeCart = [
                                {
                                    product : "product 1", 
                                    description : "description 1",
                                    price : "10 €",
                                    quantity : 1
                                },

                                {
                                    product: "product 2",
                                    description: "description 2",
                                    price: "20 €",
                                    quantity : 2
                                }
                            ]

            const stateBefore = {
                cart : fakeCart,
            };

            const stateAfter = {
                cart: [fakeCart[0]],
            };

            const removeProductAction = removeProductToCart(fakeCart[1]);

            expect(shopReducer(stateBefore, removeProductAction)).toEqual(stateAfter)

        });


        //Test 6 action INCREMENT_CART_ITEM_QUANTITY
        test('it handle correctly INCREMENT_CART_ITEM_QUANTITY', () => {
            
            const stateBefore = {
                cart : [{name: "product", description: "description", price: "10 €", quantity: 1}],
            };

            const stateAfter = {
                cart: [{name: "product", description: "description", price: "10 €", quantity: 2}],
            };

            const incrementProductAction = incrementCartQuantity(stateBefore[0]);

            expect(shopReducer(stateBefore, incrementProductAction)).toEqual(stateAfter)

        });


        //Test 7 action DECREMENT_CART_ITEM_QUANTITY
        test('it handle correctly DECREMENT_CART_ITEM_QUANTITY', () => {
            
            const product = {name: "product2", description: "description2", price: "10 €", quantity: 2} ;

            const stateBefore = {
                cart : [{name: "product", description: "description", price: "10 €", quantity: 2}, product],
            };

            const stateAfter = {
                cart: [{name: "product", description: "description", price: "10 €", quantity: 1}, product],
            };

            const decrementProductAction = decrementCartQuantity(stateBefore[0]);

            expect(shopReducer(stateBefore, decrementProductAction)).toEqual(stateAfter)

        });

        
    });
});