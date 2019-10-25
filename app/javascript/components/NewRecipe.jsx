import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import API from './API/baseApi';

export default class NewRecipe extends Component {

    state = {
      name: "",
      ingredients: "",
      instruction: ""
    }
    
  stripHtmlEntities=(str)=> {
    return String(str)
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  onChange= (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    });
  }

  onSubmit = async (event) => {

    event.preventDefault();
    try {
      const {name, ingredients, instruction} = this.state;

      if (name.length == 0 || ingredients.length == 0 || instruction.length == 0)
        return;

      const body = {
        name,
        ingredients,
        instruction: instruction.replace(/\n/g, "<br> <br>")
      };

      const token = document.querySelector('meta[name="csrf-token"]').content;
      const res = await API.post("/api/v1/recipes/create",
        body
        , {
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json"
          }
        })

      this.props.history.push(`/recipe/${res.data.id}`)

    } catch (error) {
      console.log(error.message)
    }
  }

  render() {
    return (
      <div className="container mt-5">
        <div className="row">
          <div className="col-sm-12 col-lg-6 offset-lg-3">
            <h1 className="font-weight-normal mb-5">
              Add a new recipe to our awesome recipe collection.
            </h1>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="recipeName">Recipe name</label>
                <input
      type="text"
      name="name"
      id="recipeName"
      className="form-control"
      required
      onChange={this.onChange}
      />
              </div>
              <div className="form-group">
                <label htmlFor="recipeIngredients">Ingredients</label>
                <input
      type="text"
      name="ingredients"
      id="recipeIngredients"
      className="form-control"
      required
      onChange={this.onChange}
      />
                <small id="ingredientsHelp" className="form-text text-muted">
                  Separate each ingredient with a comma.
                </small>
              </div>
              <label htmlFor="instruction">Preparation Instructions</label>
              <textarea
      className="form-control"
      id="instruction"
      name="instruction"
      rows="5"
      required
      onChange={this.onChange}
      />
              <button type="submit" className="btn custom-button mt-3">
                Create Recipe
              </button>
              <Link to="/recipes" className="btn btn-link mt-3">
                Back to recipes
              </Link>
            </form>
          </div>
        </div>
      </div>
      );
  }


}
