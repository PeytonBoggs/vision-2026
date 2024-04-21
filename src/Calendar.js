import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, Flex, Image, Text, useDisclosure, useToast } from "@chakra-ui/react"
import React from "react"

export default function Calendar({ month, setMonth, setUsedAction, funds, setFunds, students, tuition }) {
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    function nextMonth() {
        setMonth(month + 1)
        setUsedAction(false)

        if (month % 12 == 11 || month % 12 == 3 || month % 12 == 7) {
            newSemester();
        }

        if (month == 59) {
            toast({
                title: "Game Over",
                description: "It's 2030, and William & Mary is not entirely under construction! You can still play in endless mode.",
                status: "error",
                duration: 10000
            })
        }
    }

    function newSemester() {
        if (month % 12 == 11 || month % 12 == 7) {
            setFunds(funds + (students * tuition))
            toast({
                title: "New Semester!",
                description: "Income added to funds",
                status: "success",
                duration: 3000
            })
        } else {
            setFunds(funds + ((students * tuition)/3))
            toast({
                title: "Summer Semester!",
                description: "1/3 of income added to funds",
                status: "success",
                duration: 3000
            })
        }
    }

    // function LoseAlert() {
    //     const { isOpen, onOpen, onClose } = useDisclosure()
    //     const cancelRef = React.useRef()

    //     if (month == 59) {
    //         isOpen = true;
    //     }

    //     return (
    //         <>
    //             <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
    //                 <AlertDialogOverlay>
    //                     <AlertDialogContent>
    //                         <AlertDialogHeader>
    //                             Game Over
    //                         </AlertDialogHeader>
    //                         <AlertDialogBody>
    //                             It's January 2030 and William & Mary isn't all under construction!
    //                         </AlertDialogBody>
    //                         <AlertDialogFooter>
    //                             <Button ref={cancelRef} onClick={onClose}>
    //                                 Endless Mode
    //                             </Button>
    //                         </AlertDialogFooter>
    //                     </AlertDialogContent>
    //                 </AlertDialogOverlay>
    //             </AlertDialog>
    //         </>
    //     )
    // }

    return (
        <Flex alignItems="center" justifyContent="space-evenly" marginBottom="10px">
            <Flex fontSize="50px" fontWeight="bolder" color="#D5D8DB" background="#115740" paddingX="15px" borderRadius="10px" align="flex-start">
                Vision 2030
            </Flex>
            <Flex flex="1" justifyContent="center" fontSize="50px" fontWeight="bolder" color="#115740">
                {months[(month % 12)]} {2025 + Math.trunc(month/12)}
            </Flex>
            <Flex align="flex-end">
                <Button height="100%" fontSize="50px" fontWeight="bolder" color="#115740" background="#D5D8DB" paddingX="15px" onClick={() => nextMonth()}>
                    Next Month <Image boxSize="50px" src="/weathervane.png" marginLeft="20px"></Image>
                </Button>
            </Flex>
            <>
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                Game Over
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                It's January 2030 and William & Mary isn't all under construction!
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Endless Mode
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
        </Flex>
    )
}