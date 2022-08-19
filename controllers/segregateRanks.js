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
            segregatedRanks[`grid${gridRowItem1}${gridRowItem2}${gridRowItem3}1`] = `${splitedRanks[`${gridRowItem1}1`]},${splitedRanks[`${gridRowItem2}1`]},${splitedRanks[`${gridRowItem3}1`]}`; 
            segregatedRanks[`grid${gridRowItem1}${gridRowItem2}${gridRowItem3}2`] = `${splitedRanks[`${gridRowItem1}2`]},${splitedRanks[`${gridRowItem2}2`]},${splitedRanks[`${gridRowItem3}2`]}`; 
            segregatedRanks[`grid${gridRowItem1}${gridRowItem2}${gridRowItem3}3`] = `${splitedRanks[`${gridRowItem1}3`]},${splitedRanks[`${gridRowItem2}3`]},${splitedRanks[`${gridRowItem3}3`]}`; 
        }
        // console.log('segregatedRanks', segregatedRanks)
        return segregatedRanks;
    }

module.exports = {segregateRanks}