const FilterBar = () => {
  return (
    <div className="mt-2 mb-4" style={{ backgroundColor: 'navajowhite' }}>
      FILTRY - NAJSTARSZE, NAJNOWSZE, ULUBIONE
    </div>
  );
};

export default FilterBar;

// import React, { useState } from 'react';
// import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

// const Example = (props) => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const toggle = () => setDropdownOpen(prevState => !prevState);

//   return (
//     <Dropdown isOpen={dropdownOpen} toggle={toggle}>
//       <DropdownToggle caret>
//         Dropdown
//       </DropdownToggle>
//       <DropdownMenu>
//         <DropdownItem header>Header</DropdownItem>
//         <DropdownItem>Some Action</DropdownItem>
//         <DropdownItem text>Dropdown Item Text</DropdownItem>
//         <DropdownItem disabled>Action (disabled)</DropdownItem>
//         <DropdownItem divider />
//         <DropdownItem>Foo Action</DropdownItem>
//         <DropdownItem>Bar Action</DropdownItem>
//         <DropdownItem>Quo Action</DropdownItem>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }

// export default Example;
