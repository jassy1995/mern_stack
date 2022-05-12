import algoliasearch from "algoliasearch/lite";
import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { formatter } from "../script/formatter";
import { Star } from "react-bootstrap-icons";
import {
  InstantSearch,
  Hits,
  SearchBox,
  Pagination,
  RefinementList,
  Configure,
} from "react-instantsearch-dom";
import PropTypes from "prop-types";
import "../App.css";
const api1 = "XU5H0M3RQ1";
const api2 = "26ac50d59243af19de8b0975b2c68346";
const searchClient = algoliasearch(api1, api2);

class SearchComponent extends Component {
  render() {
    return (
      <div>
        <Container className="cont mt-4">
          <InstantSearch indexName="products" searchClient={searchClient}>
            <div className="d-md-flex justify-content-between ">
              <div className="d-flex gap-4 sorted mb-3">
                <div>
                  <h6 className="fw-bolder">Brand</h6>
                  <RefinementList
                    attribute="brand"
                    transformItems={(items) =>
                      items.map((item) => ({
                        ...item,
                        label: item.label.toLowerCase(),
                      }))
                    }
                    translations={{
                      showMore(expanded) {
                        return expanded ? "Show less" : "Show more";
                      },
                      noResults: "No results",
                      submitTitle: "Submit your search query.",
                      resetTitle: "Clear your search query.",
                      placeholder: "Search here...",
                    }}
                  />
                </div>
                <div className="border-0 border-start-4">
                  <h6 className="fw-bolder">category</h6>
                  <RefinementList
                    attribute="category"
                    transformItems={(items) =>
                      items.map((item) => ({
                        ...item,
                        label: item.label.toLowerCase(),
                      }))
                    }
                    translations={{
                      showMore(expanded) {
                        return expanded ? "Show less" : "Show more";
                      },
                      noResults: "No results",
                      submitTitle: "Submit your search query.",
                      resetTitle: "Clear your search query.",
                      placeholder: "Search here...",
                    }}
                  />
                </div>
              </div>
              <div className="text-md-end">
                <SearchBox />
              </div>
            </div>
            <Configure hitsPerPage={8} />
            <div className="row g-4">
              <Hits hitComponent={Hit} />
            </div>
            <Pagination />
          </InstantSearch>
        </Container>
      </div>
    );
  }
}

function Hit(props) {
  return (
    <div>
      <div className="card h-100">
        <img
          src={props.hit.image}
          alt={props.hit.name}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title fw-bolder">
            {props.hit.name.length > 15
              ? props.hit.name.slice(0, 15).padEnd(18, ".")
              : props.hit.name}
          </h5>
          <div className="text-muted">
            {" "}
            {props.hit.description.length > 40
              ? props.hit.description.slice(0, 40).padEnd(43, ".")
              : props.hit.description}
          </div>
          {Array.from({ length: 5 }).map((_, idx) => (
            <span key={idx}>
              <Star color="darkorange" size={16} />{" "}
            </span>
          ))}
          <small
            className="float-end fw-bolder"
            style={{ color: "darkorange" }}
          >
            10 reviews
          </small>
          <p className="card-text">
            <span>
              <strong className="text-start fs-5 fw-bolder">
                {formatter(props.hit.price)}
              </strong>

              <Button variant="success" className="float-end">
                Add to cart
              </Button>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

Hit.propTypes = {
  hit: PropTypes.object.isRequired,
};

export default SearchComponent;
