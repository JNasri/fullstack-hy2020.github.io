import React, { useState } from 'react';
import { graphql } from "gatsby"
import Layout from '../components/layout';
import { useDebounce } from 'use-debounce';
import { useFlexSearch } from 'react-use-flexsearch';
import SearchResults from '../components/Search/SearchResults';
import Element from '../components/Element/Element';
import InputField from '../components/InputField/InputField';
import { BodyText } from '../components/BodyText/BodyText';


const Search = ({ data }) => {
  // console.log('data ', data)
  const { index, store } = data.localSearchFinnish;
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 500);

  const handleInpuptChange = (event) => {
    setQuery(event.target.value);
  }

  const results = useFlexSearch(debouncedQuery, index, store);
  // console.log('results ', results)  

  return (
    <Layout>
      <Element className="container spacing spacing--mobile--large">
        <Element className="col-8 push-right-1">
          <BodyText
            heading={{ level: 'h1', title: 'Etsi hakusanalla materiaalista' }}
            headingFontSize="2.3rem"
          />
        <Element
          className="container spacing--after-small"
        >
          <InputField
            type='search'
            value={query}
            onChange={handleInpuptChange}
            placeHolder='Syötä hakusana'
          />
        </Element>
        <SearchResults
          results={filterResults(results)}
          query={query}
          lang='fi'
        />
      </Element>
      </Element>
    </Layout>
  )
};

export default Search;

export const pageQuery = graphql`
  query {
    localSearchFinnish {
      store
      index
    }
  }
`

const filterResults = (results) => {
  return results.filter(res => res.letter !== null).slice(0, 10);
}
