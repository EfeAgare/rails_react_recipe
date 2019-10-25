import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import API from './API/baseApi';
export default class Recipe extends Component {

  state = {
      recipe: {
        ingredients: ""
      }
    }
  async componentDidMount() {
    try {
      const {match: {params: {id}}} = this.props;


      const res = await API.get(`/api/v1/show/${id}`);

      this.setState({
        recipe: res.data
      })
    } catch (error) {
      console.log(error)
      this.props.history.push("/recipes")
    }

  }

  addHtmlEntities = (str)=> {
    return String(str)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  }
  render() {
    const { recipe } = this.state;
    let ingredientList = "No ingredients available";

    if (recipe.ingredients.length > 0) {
      ingredientList = recipe.ingredients
        .split(",")
        .map((ingredient, index) => (
          <li key={index} className="list-group-item">
            {ingredient}
          </li>
        ));
    }
    const recipeInstruction = this.addHtmlEntities(recipe.instruction);

    return (
      <div className="">
        <div className="hero position-relative d-flex align-items-center justify-content-center">
          <img
            src={recipe.image}
            alt={`${recipe.name} image`}
            className="img-fluid position-absolute"
          />
          <div className="overlay bg-dark position-absolute" />
          <h1 className="display-4 position-relative text-white">
            {recipe.name}
          </h1>
        </div>
        <div className="container py-5">
          <div className="row">
            <div className="col-sm-12 col-lg-3">
              <ul className="list-group">
                <h5 className="mb-2">Ingredients</h5>
                {ingredientList}
              </ul>
            </div>
            <div className="col-sm-12 col-lg-7">
              <h5 className="mb-2">Preparation Instructions</h5>
              <div
                dangerouslySetInnerHTML={{
                  __html: `${recipe.instruction}`
                }}
              />
            </div>
            <div className="col-sm-12 col-lg-2">
              <button type="button" className="btn btn-danger">
                Delete Recipe
              </button>
            </div>
          </div>
          <Link to="/recipes" className="btn btn-link">
            Back to recipes
          </Link>
        </div>
      </div>
    );
  }
}
