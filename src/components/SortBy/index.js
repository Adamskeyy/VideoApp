// hooks
import React, { useState } from 'react';
// reactstrap
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
// redux
import { useDispatch } from 'react-redux';
import { sortByNewest, sortByOldest } from '../../redux/videoAppSlice';

const SortBy = () => {
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Dropdown
      style={{ display: 'inline-block' }}
      className="m-2"
      isOpen={dropdownOpen}
      toggle={toggleDropdown}
    >
      <DropdownToggle caret>Sort by</DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={() => dispatch(sortByOldest())}>
          Oldest
        </DropdownItem>
        <DropdownItem onClick={() => dispatch(sortByNewest())}>
          Newest
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default SortBy;
