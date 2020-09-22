import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux'
import {
  fetchAlbums,
  fetchAlbumsSuccess,
  fetchAlbumsFailure,

  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailure,

  generateList,
  fetchNextPage,
  fetchPrevPage
} from "./actions";
import { fetchAlbumsAPI, fetchUsersAPI } from "./apis";
import { pageLimit } from "./constants";
import ListItem from './components/listItem';
import PageElement from "./components/pageElement";

class App extends Component {
  componentDidMount() {
    this.props.getAlbums();
    this.props.getUsers();
  }

  componentDidUpdate() {
    const { albums, users, list } = this.props;

    if (list.data || !albums.data || !users.data) return;

    this.props.getList();
  }

  prevFive = () => {
    this.props.getPrevPage();
  }

  nextFive = () => {
    this.props.getNextPage();
  }

  generatePageRange = () => {
    const { grandList, nextStartingIndex } = this.props;

    if (!grandList) return <PageElement page={0} flag={true} />;

    const pageRange = [];

    for (let i = 0; i < grandList.length; i += pageLimit) {
      const curr = nextStartingIndex / pageLimit;
      const pNo = (i / pageLimit) + 1;

      pageRange.push(
        <PageElement page={pNo} flag={curr === pNo} />
      );
    }

    return pageRange;
  }

  render() {
    const { list } = this.props;

    return (
      <div className="page">
        <h1>LIST OF ALBUMS</h1>

        {
          list.data &&
          list.data.map(li => <ListItem item={li} />)
        }

        <div className="pagination">
          <button onClick={this.prevFive} disabled={!list.prev}>Previous</button>
          {this.generatePageRange()}
          <button onClick={this.nextFive} disabled={!list.next}>Next</button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAlbums: async () => {
      dispatch(fetchAlbums());

      try {
        const response = await fetch(fetchAlbumsAPI);
        const res = await response.json();
        dispatch(fetchAlbumsSuccess(res));
      } catch (e) {
        dispatch(fetchAlbumsFailure(e))
      }
    },
    getUsers: async () => {
      dispatch(fetchUsers());

      try {
        const response = await fetch(fetchUsersAPI);
        const res = await response.json();
        dispatch(fetchUsersSuccess(res));
      } catch (e) {
        dispatch(fetchUsersFailure(e))
      }
    },
    getList: () => dispatch(generateList()),
    getNextPage: () => dispatch(fetchNextPage()),
    getPrevPage: () => dispatch(fetchPrevPage())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
