import React, { useState } from 'react';
import { FixedSizeList } from 'react-window';
import { useDebounce } from 'react-use';
import InfiniteLoader from 'react-window-infinite-loader';
import { usePropertiesCount } from './hooks/usePropertiesCount';
import { useProperties } from './hooks/useProperties';

const fields = {
  id: 'ID',
  ownerName: 'Owner name',
  address: 'Address',
  units: 'Units',
  score: 'Score',
  convRent: 'Conv. Rent',
  rentPerMo: 'Rent/mo',
};

const fieldKeys = Object.entries(fields);

function App() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(0);

  useDebounce(() => setDebouncedQuery(query), 250, [query]);

  const { loading: isCountLoading, count = 0 } = usePropertiesCount({ query: debouncedQuery });
  const { loading: isPropertiesLoading, fetchMore, properties = [] } = useProperties({ query: debouncedQuery, sortField, sortOrder, page: 0 });

  const changeSorting = (field) => {
    if (sortField === field) {
      setSortOrder((order) => order === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  }

  const hasMoreItems = properties.length !== count;
  Ō
  const loadMoreItems = () => {
    fetchMore({
      variables: {
        page: page + 1,
      },
      updateQuery(prev, { fetchMoreResult }) {
        return {
          ...prev,
          allProperties: prev.allProperties.concat(...fetchMoreResult.allProperties)
        };
      }
    });

    setPage((currentPage) => currentPage + 1);
  }

  const isItemLoaded = (index) => !hasMoreItems || index < properties.length;

  return (
    <div>
      <input placeholder="Search" value={query} onChange={(event) => setQuery(event.target.value)} />

      <div style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}>
        {fieldKeys.map(([key, label]) => (
          <strong style={{ flex: '1 1 0' }} key={key} onClick={() => changeSorting(key)}>
            {label}
            {' '}
            {sortField === key && (
              sortOrder === "asc" ? '/\\' : '\\/'
            )}
          </strong>
        ))}
      </div>
      <div>
        {(isCountLoading || isPropertiesLoading) ? 'Loading...' : (


          <InfiniteLoader itemCount={count} loadMoreItems={loadMoreItems} isItemLoaded={isItemLoaded}>
            {({ onItemsRendered, ref }) => (
              <FixedSizeList height={500} itemSize={20} itemCount={count} onItemsRendered={onItemsRendered} ref={ref}>
                {({ index, style }) => {
                  if (!isItemLoaded(index)) {
                    return <div style={style}>Loading...</div>
                  }

                  return (
                    <div style={{ ...style, display: 'flex', justifyContent: 'space-between', textAlign: 'left' }}>
                      {fieldKeys.map(([key]) => (
                        <div
                          key={key}
                          title={properties[index][key]}
                          style={{ flex: '1 1 0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', paddingRight: 5 }}
                        >
                          {properties[index][key]}
                        </div>
                      ))}
                    </div>
                  )
                }}
              </FixedSizeList>
            )}
          </InfiniteLoader>
        )}
      </div>
    </div>
  );
}

export default App;
