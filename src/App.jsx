/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import categoriesFromServer from './api/categories';
import productsFromServer from './api/products';

// const products = productsFromServer.map((product) => {
//   const category = null; // find by product.categoryId
//   const user = null; // find by category.ownerId

//   return null;
// });

export const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchField, setSearchField] = useState('');

  const filterUser = userId => {
    setSelectedUser(userId === selectedUser ? null : userId);
  };

  const clearFilter = () => {
    setSelectedUser(null);
    setSearchField('');
  };

  const changeSearch = event => {
    setSearchField(event.target.value);
  };

  const filteredProducts = productsFromServer.filter(product =>
    product.name.toLowerCase().includes(searchField.toLowerCase()),
  );

  const userFilteredProducts = selectedUser
    ? filteredProducts.filter(product => {
      const category = categoriesFromServer.find(
        cat => cat.id === product.categoryId,
      );
      const user = usersFromServer.find(usr => usr.id === category.ownerId);

      return user.id === selectedUser;
    })
    : filteredProducts;

  return (
    <div className="section">
      <div className="container">
        <h1 className="title">Product Categories</h1>

        <div className="block">
          <nav className="panel">
            <p className="panel-heading">Filters</p>

            <p className="panel-tabs has-text-weight-bold">
              <a
                href="#/"
                className={`button ${selectedUser === null ? 'is-active' : ''}`}
                onClick={() => filterUser(null)}
                data-cy="FilterAllUsers"
              >
                All
              </a>

              {usersFromServer.map(user => (
                <a
                  data-cy="FilterUser"
                  href="#/"
                  key={user.id}
                  className={`button ${selectedUser === user.id ? 'is-active' : ''}`}
                  onClick={() => filterUser(user.id)}
                >
                  {user.name}
                </a>
              ))}
            </p>

            <div className="panel-block">
              <p className="control has-icons-left has-icons-right">
                <input
                  data-cy="SearchField"
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchField}
                  onChange={changeSearch}
                />

                <span className="icon is-left">
                  <i className="fas fa-search" aria-hidden="true" />
                </span>

                {searchField && (
                  <span className="icon is-right">
                    <button
                      type="button"
                      className="delete"
                      onClick={() => setSearchField('')}
                      data-cy="ClearButton"
                    />
                  </span>
                )}
              </p>
            </div>

            <div className="panel-block is-flex-wrap-wrap">
              <a
                href="#/"
                data-cy="AllCategories"
                className="button is-success mr-6 is-outlined"
              >
                All
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 1
              </a>

              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 2
              </a>

              <a
                data-cy="Category"
                className="button mr-2 my-1 is-info"
                href="#/"
              >
                Category 3
              </a>
              <a data-cy="Category" className="button mr-2 my-1" href="#/">
                Category 4
              </a>
            </div>

            <div className="panel-block">
              <a
                data-cy="ResetAllButton"
                href="#/"
                className="button is-link is-outlined is-fullwidth"
                onClick={clearFilter}
              >
                Reset all filters
              </a>
            </div>
          </nav>
        </div>

        <div className="box table-container">
          <table
            className="table is-striped is-narrow is-fullwidthtable"
            data-cy="ProductTable"
          >
            <thead>
              <tr>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    ID
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Product
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    Category
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
                <th>
                  <span className="is-flex is-flex-wrap-nowrap">
                    User
                    <a href="#/">
                      <span className="icon">
                        <i data-cy="SortIcon" className="fas fa-sort" />
                      </span>
                    </a>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {userFilteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="4" data-cy="NoMatchingMessage">
                    No products matching the current criteria
                  </td>
                </tr>
              ) : (
                userFilteredProducts.map(product => {
                  const category = categoriesFromServer.find(
                    cat => cat.id === product.categoryId,
                  );
                  const user = usersFromServer.find(
                    usr => usr.id === category.ownerId,
                  );

                  return (
                    <tr key={product.id} data-cy="Product">
                      <td data-cy="ProductId">{product.id}</td>
                      <td data-cy="ProductName">{product.name}</td>
                      <td data-cy="SortIcon">
                        {category.icon} {category.title}
                      </td>
                      <td
                        data-cy="ProductUser"
                        className={
                          user.sex === 'm' ? 'has-text-link' : 'has-text-danger'
                        }
                      >
                        {user.name}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
