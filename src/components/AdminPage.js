import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../features/products/productsSlice";

function AdminPage() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.list);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    image: null,
    quantity: 0,
  });
  const [editingProductId, setEditingProductId] = useState(null);

  //сброс данных формы
  const resetFormData = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      image: null,
      quantity: 0,
    });
  };

  //добавление товаров
  const handleAddProduct = () => {
    dispatch(addProduct(formData));
    resetFormData();
  };

  //удаление товара
  const handleDeleteProduct = (productId) => {
    dispatch(deleteProduct(productId));
  };

  //изменение товара
  const handleEditProduct = (product) => {
    setEditingProductId(product._id);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      quantity: product.quantity,
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="container">
      <div class="accordion my-4" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Добавление товара
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="headingOne"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <form onSubmit={handleAddProduct}>
                <div className="form-group my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Название товара"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div className="form-group my-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Описание товара"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="price" className="form-label">
                    Цена товара:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    min={0}
                    name="price"
                    id="price"
                  />
                </div>
                <div className="form-group my-3">
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.files[0].name,
                      })
                    }
                  />
                </div>
                <div className="form-group my-3">
                  <label htmlFor="quantity" className="form-label">
                    Количество товара:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.quantity}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        quantity: Number(e.target.value),
                      })
                    }
                    min={0}
                    name="quantity"
                    id="quantity"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Добавить товар
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Изображение</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Цена</th>
            <th>Количество</th>
            <th>Действия</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`../public/images/${product.image}`}
                    alt={product.name}
                    width="70"
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price} руб.</td>
                <td>{product.quantity}</td>
                <td>
                  <button
                    className="btn btn-outline-warning"
                    onClick={handleEditProduct(product)}
                  >
                    Изменить
                  </button>
                  <button
                    className="btn btn-outline-danger"
                    onClick={handleDeleteProduct(product._id)}
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Нет доступных товаров</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
