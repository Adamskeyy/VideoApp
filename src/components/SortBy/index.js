// hooks
import React, { useEffect, useState } from 'react';
// reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// redux
import { useSelector } from 'react-redux';

const SortBy = () => {
  const videos = useSelector((state) => state.videoApp.videos);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const sortByOldest = () => {
    const array = [...videos];
    const sortedArray = array.sort(
      (a, b) =>
        new Date(a.rawDateTime).getTime() - new Date(b.rawDateTime).getTime()
    );
    console.log(sortedArray);
  };
  const sortByNewest = () => {
    const array = [...videos];
    const sortedArray = array.sort(
      (a, b) =>
        new Date(b.rawDateTime).getTime() - new Date(a.rawDateTime).getTime()
    );
    console.log(sortedArray);
  };

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle caret>Sort by</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={sortByOldest}>Oldest</DropdownItem>
        <DropdownItem onClick={sortByNewest}>Newest</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortBy;
