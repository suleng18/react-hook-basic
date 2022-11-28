import queryString from 'query-string';
import { useEffect, useState } from 'react';
import './App.scss';
import Clock from './components/Clock';
import Pagination from './components/Pagination';
import PostFiltersForm from './components/PostFiltersForm';
import PostList from './components/PostList';

function App() {
  const [postList, setPostList] = useState([]);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 10,
    _totalRows: 1,
  });
  const [filter, setFilter] = useState({
    _limit: 10,
    _page: 1,
  });
  const [showClock, setShowClock] = useState(true);

  useEffect(() => {
    async function fetchPostList() {
      try {
        const paramsString = queryString.stringify(filter);
        const requestUrl = `http://js-post-api.herokuapp.com/api/posts?${paramsString}`;
        const response = await fetch(requestUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data);
        setPagination(pagination);
      } catch (error) {
        console.log(error);
      }
    }
    fetchPostList();
  }, [filter]);

  const handlePageChange = (newPage) => {
    setFilter({
      ...filter,
      _page: newPage,
    });
  };

  const handleFilterChange = (newFilter) => {
    setFilter({
      ...filter,
      _page: 1,
      title_like: newFilter.searchTerm,
    });
  };

  return (
    <div className="app">
      <h1>Welcom Post List</h1>
      <PostFiltersForm onSubmit={handleFilterChange} />
      <PostList posts={postList} />
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
      {showClock && <Clock />}
      <button onClick={() => setShowClock(false)}>Show Clock</button>
    </div>
  );
}

export default App;
