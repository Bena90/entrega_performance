const checkProduct = (array, id) => {

    const checkExist = array.some(item => item.id === id);

    if (checkExist) {
        return true;
    }
    return false;
}

export default checkProduct;