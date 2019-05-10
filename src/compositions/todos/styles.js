import styled from 'styled-components';

const TodosContainer = styled.div`
  margin: 0 0 30px;
  user-select: none;
`;

const AllCompleted = styled.div`
  font-size: 80px;
  position: relative;
  color: #ccc;
  margin: 20px auto 0;
  padding: 10px 0;
  text-align: center;
  background-color: #fbfbfb;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style-type: none;
`;

export default {
  TodosContainer,
  AllCompleted,
  List,
};
