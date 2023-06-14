const request = require('supertest')('http://localhost:8080')
const expect = require('chai').expect

describe('Testing products of API', () => {

  it('Debería devolver un array de objetos', (done) => {
    request
      .get('/api/productos')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.be.an('array')

        res.body.forEach((item) => {
          expect(item).to.be.an('object')
        })

        done()
      })
  })

  it('Debería devolver un objeto con las claves esperadas', (done) => {
    request
      .get('/api/productos/63bf3e206e8815d53b27a05c')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.be.an('object')
        expect(res.body).to.have.any.keys(
          'nombre',
          'descripcion',
          'codigo',
          'foto',
          'precio',
          'stock'
        )
        done()
      })
  })

  it('Debería agregar un producto', (done) => {
    const newProduct = {
      nombre: 'Product 1',
      descripcion: 'Description 1',
      codigo: '111',
      foto: 'http://localhost/img1.jpg',
      precio: '100',
      stock: '10',
    }

    request
      .post('/api/productos')
      .send(newProduct)
      .set('role', 'admin')
      .expect(201)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.not.have.property('error')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('Debería actualizar un producto existente', (done) => {
    const updatedProducts = {
      nombre: ' Updated Product ',
      descripcion: 'Updated Description',
      codigo: '222',
      foto: 'http://picsum.photos/200/300',
      precio: '200',
      stock: '3',
    }

    const productID = '63e41157ef1f5834bffeffcd'

    request
      .put(`/api/productos/${productID}`)
      .send(updatedProducts)
      .set('role', 'admin')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.not.have.property('error')
        expect(res.body).to.have.property('message')
        done()
      })
  })

  it('Debería eliminar un producto existente', (done) => {
    const productID = '63e41157ef1f5834bffeffcd'

    request
      .delete(`/api/productos/${productID}`)
      .set('role', 'admin')
      .expect(200)
      .end((err, res) => {
        expect(err).to.be.null
        expect(res.body).to.not.have.property('error')
        expect(res.body).to.have.property('message')
        done()
      })
  })
})
