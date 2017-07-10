package main

import "fmt"
import "github.com/hyperledger/fabric/core/chaincode/shim"

type documentInfo struct {
	Owner string `json:"owner"`
	Docs []string `json:"docs"`
}

type user struct {
    Owns string `json:"owns"`
    SharedwithMe []documentInfo `json:"sharedwithme"`
}


 
type SampleChaincode struct {
}
 
func (t *SampleChaincode) Init(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
    return nil, nil
}
 
func (t *SampleChaincode) Query(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
    return nil, nil
}
 
func (t *SampleChaincode) Invoke(stub shim.ChaincodeStubInterface, function string, args []string) ([]byte, error) {
    return nil, nil
}
 
func main() {
    err := shim.Start(new(SampleChaincode))
    if err != nil {
        fmt.Println("Could not start SampleChaincode")
    } else {
        fmt.Println("SampleChaincode successfully started")
    }
 
}