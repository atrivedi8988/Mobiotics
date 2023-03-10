import { Button, Center, HStack } from "@chakra-ui/react";

function Pagination({ total, page, setPage, limit }) {
  const totalPages = new Array(total).fill(0).map((el, i) => (
    <Button
    colorScheme={"teal"}
      onClick={() => setPage(i + 1)}
      isDisabled={page === i + 1}
      key={i + 1}
    >
      {i + 1}
    </Button>
  ));
  const leftButton = (
    <Button colorScheme={"blue"} isDisabled={page === 1} onClick={() => setPage(page - 1)}>
      left
    </Button>
  );
  const rightButton = (
    <Button colorScheme={"blue"} isDisabled={page === 5} onClick={() => setPage(page + 1)}>
      right
    </Button>
  );
  //   console.log(totalPages)
  //   console.log(page)
  return (
    <>
      <HStack mt={"30px"} mb="50px" justifyContent={"center"} gap={"10px"}>
        {leftButton}
        {totalPages}
        {rightButton}
      </HStack>
    </>
  );
}

export default Pagination;
