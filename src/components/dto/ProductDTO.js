const uniqid = require('uniqid')

class ProductFirebaseDto {
    constructor(product) {
        this.id = uniqid();
        this.timestamp = Date.now();
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
        this.categoria = product.categoria;
    }
}

class ProductMongoDto {
    constructor(product) {
        this.timestamp = Date.now();
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
        this.categoria = product.categoria;
    }
}

class ProductNormaliceIdDto {
    constructor(product) {
        this.id = product._id.toString();
        this.timestamp = product.timestamp;
        this.nombre = product.nombre;
        this.descripcion = product.descripcion;
        this.codigo = product.codigo;
        this.foto = product.foto;
        this.precio = product.precio;
        this.stock = product.stock;
        this.categoria = product.categoria;
    }
}

module.exports = { ProductFirebaseDto, ProductMongoDto, ProductNormaliceIdDto };