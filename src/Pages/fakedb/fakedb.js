// use local storage as your db for now

const addToDb = id => {
    const exists = getDb();
    let color_cart = {};
    if (!exists) {
        color_cart[id] = id;
    }
    else {
        color_cart = JSON.parse(exists);
        color_cart[id] = id;
    }
    updateDb(color_cart);
}

const addToDb2 = (id,quantity) => {
    const exists = getDb();
    let color_cart = {};
    if (!exists) {
        color_cart[id] = 1;
    }
    else {
        color_cart = JSON.parse(exists);
        if (color_cart[id]) {
            const newCount = color_cart[id] + quantity;
            color_cart[id] = newCount;
        }
        else {
            color_cart[id] = 1;
        }
    }
    updateDb(color_cart);
}

const getDb = () => localStorage.getItem('color_cart');

const updateDb = cart => {
    localStorage.setItem('color_cart', JSON.stringify(cart));
}

const removeFromDb = id => {
    const exists = getDb();
    if (!exists) {

    }
    else {
        const color_cart = JSON.parse(exists);
        delete color_cart[id];
        updateDb(color_cart);
    }
}

const getStoredCart = () => {
    const exists = getDb();
    return exists ? JSON.parse(exists) : {};
}

const clearTheCart = () => {
    localStorage.removeItem('color_cart');
}

export { addToDb,addToDb2, removeFromDb, clearTheCart, getStoredCart }