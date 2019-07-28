import * as React from 'react';
import styled from 'styled-components';
import Pagination from 'react-bootstrap/Pagination';

interface Props {
  handlePageChange: (number: number) => void,
  totalCount: number,
  itemPerPage: number,
  currentPage: number,
}

const StyledPagination = styled(Pagination)`
  justify-content: center;
`;

const ListPagination = (props: Props) => {
  const {
    totalCount, itemPerPage, currentPage, handlePageChange,
  } = props;

  const totalPage = Math.ceil(totalCount / itemPerPage);
  const prevPage = currentPage > 0 ? currentPage - 1 : null;
  const nextPage = totalPage > currentPage + 1 ? currentPage + 1 : null;
  
  const numberPagination = React.useMemo((): React.ReactNode => {
    const items = [];
    for (let number = 1; number <= totalPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage + 1}
          onClick={(): void => handlePageChange(number - 1)}
        >
          {number}
        </Pagination.Item>,
      );
    }
    return items;
  }, [currentPage, totalPage, handlePageChange]);

  return (
    <StyledPagination>
      <Pagination.Prev
        active={prevPage !== null}
        disabled={prevPage === null}
        onClick={(): void =>
          (prevPage !== null ? handlePageChange(prevPage) : undefined)
        }
      />
      {numberPagination}
      <Pagination.Next
        active={nextPage !== null}
        disabled={nextPage === null}
        onClick={(): void =>
          (nextPage !== null ? handlePageChange(nextPage) : undefined)
        }
      />
    </StyledPagination>
  );
}

export default React.memo<Props>(ListPagination);
