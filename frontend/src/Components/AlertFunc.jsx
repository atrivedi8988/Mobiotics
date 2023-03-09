import { Button, useToast } from '@chakra-ui/react'

export function SuccessToast(title) {
    console.log(title)
    const toast = useToast({
        position: 'top',
        title: 'Container style is updated',
        containerStyle: {
          width: '800px',
          maxWidth: '100%',
        },
      })

      return toast
    // return (
    //   <Button
    //     onClick={() =>
    //       toast({
    //         title: {title},
    //         status: 'success',
    //         duration: 3000,
    //         isClosable: true,
    //       })
    //     }
    //   >
    //     Show Toast
    //   </Button>
    // )
  }