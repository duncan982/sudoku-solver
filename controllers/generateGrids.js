const generateGrids = (ranks) =>{
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

    let splitedRanks = splitRanksAndStacks(ranks, 'ranks');
    // console.log('splitedRanks', splitedRanks)

    // segregate ranks into grids
    const segregateRanks = (splitedRanks) =>{
        let segregatedRanks = {}; // create object to hold all grids
        let gridRows = ['ABC', 'DEF', 'GHI'] // create an array containing the three groups of rows

        //iterate gridRows to obtain rank values from splitedRanks
        for(let i=0; i < gridRows.length; i++){
            let gridRowItem1 = gridRows[i].split('')[0]
            let gridRowItem2 = gridRows[i].split('')[1]
            let gridRowItem3 = gridRows[i].split('')[2]
            // recreate all nine grids
            segregatedRanks[`${gridRowItem1}1${gridRowItem2}1${gridRowItem3}1`] = `${splitedRanks[`${gridRowItem1}1`]},${splitedRanks[`${gridRowItem2}1`]},${splitedRanks[`${gridRowItem3}1`]}`; 
            segregatedRanks[`${gridRowItem1}2${gridRowItem2}2${gridRowItem3}2`] = `${splitedRanks[`${gridRowItem1}2`]},${splitedRanks[`${gridRowItem2}2`]},${splitedRanks[`${gridRowItem3}2`]}`; 
            segregatedRanks[`${gridRowItem1}3${gridRowItem2}3${gridRowItem3}3`] = `${splitedRanks[`${gridRowItem1}3`]},${splitedRanks[`${gridRowItem2}3`]},${splitedRanks[`${gridRowItem3}3`]}`; 
        }
        // console.log('segregatedRanks', segregatedRanks)
        return segregatedRanks;
    }

    let grids = segregateRanks(splitedRanks);
    // console.log('grids', grids)
    return grids
    
};
module.exports = generateGrids