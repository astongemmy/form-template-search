// Hooks
import React, { useRef, useState } from "react";
import useDebouncedSearch from "../hooks/useDebouncedSearch";
import useFilters from "../hooks/useFilters";

// Components
import SearchInput from "./SearchInput";
import SelectInput from "./SelectInput"

// Filter options
const filterOptions = {
  category: [
    { value: 'All', text: 'All' },
    { value: 'Health', text: 'Health' },
    { value: 'Education', text: 'Education' },
    { value: 'E-commerce', text: 'E-commerce' }
  ],
  order: [
    { value: 'default', text: 'Default' },
    { value: 'ascending', text: 'Ascending' },
    { value: 'descending', text: 'Descending' }
  ],
  date: [
    { value: 'default', text: 'Default' },
    { value: 'ascending', text: 'Ascending' },
    { value: 'descending', text: 'Descending' }
  ]
}

const Filters = () => {
  const { debouncedTerm, setDebouncedTerm } = useDebouncedSearch()
  
  const searchInputRef = useRef()
  const categoryFilterRef = useRef()
  const orderFilterRef = useRef()
  const dateFilterRef = useRef()

  const [isFilterOpen, toggleFilter] = useState(false)

  const {
    handleCategoryFilter,
    handleOrderFilter,
    handleDateFilter
  } = useFilters({
    searchInputRef,
    orderFilterRef,
    dateFilterRef
  })
  
  return (
    <div className='filter-container'>
      <form className="search-form">
        <SearchInput
          id="search"
          defaultValue={debouncedTerm}
          getValue={(value) => setDebouncedTerm(value)}
          ref={searchInputRef}
          isFilterOpen={isFilterOpen}
        />
        
        <button
          onClick={() => toggleFilter(!isFilterOpen)}
          type="button" className="toggle-filter-button"
        >
          Sort
        </button>

        <div className={`${(isFilterOpen && 'show ')} filters`}>
          <h6 className="sort">Sort By:</h6>

          <div className="filter-area">
            <SelectInput
              id="category-filter"
              label="Category"
              defaultValue={'all'}
              ref={categoryFilterRef}
              options={filterOptions.category}
              getSelection={(value) => handleCategoryFilter(value)}
            />

            <SelectInput
              id="sort-name"
              label="Order"
              defaultValue={'default'}
              ref={orderFilterRef}
              options={filterOptions.order}
              getSelection={(value) => handleOrderFilter(value)}
            />

            <SelectInput
              id="sort-date"
              label="Date"
              defaultValue={'default'}
              ref={dateFilterRef}
              options={filterOptions.date}
              getSelection={(value) => handleDateFilter(value)}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default Filters;