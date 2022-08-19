const splitRanksAndStacks = (object, type) =>{
        // split ranks into 3 groups: ABC, DEF, GHI and stacks into 3 groups: 123,456,789

        let splittedObject = {} // create an object to hold key values after splitting
        for(const[key, value] of Object.entries(object)){
            let splittedValues = value.match(/.{1,3}/g) // split string every 3rd character

            if (type === "ranks"){ // split ranks
                // create three subtypes of rank
                let rank1 = `${key}1`;
                let rank2 = `${key}2`;
                let rank3 = `${key}3`;

                let rank1Values = splittedValues[0] // subset splittedValues to get the first 3 strings
                let rank2Values = splittedValues[1] // subset splittedValues to get the second 3 strings
                let rank3Values = splittedValues[2] // splittedValues to get the third 3 strings

                // add key values pairs to splittedObject
                splittedObject[rank1] = rank1Values
                splittedObject[rank2] = rank2Values
                splittedObject[rank3] = rank3Values
            }
        };
        return splittedObject;
    }
module.exports = {splitRanksAndStacks}