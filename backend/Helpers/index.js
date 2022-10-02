export  const success = (message = "" , data = {} , status = 200) => {
    data = data == null ? {} : data;
    return {message , data , status};
}
export const error = (message = "" , status = 500 , meta = {}) => {
    return {message , status , meta};
}

export const slug = (value) => {
    return value.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export default {success ,error , slug};