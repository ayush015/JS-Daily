/* In Node 18.1.0 update our very own fetch Api which is the
part of web Api has been added So just trying out that with an 
asynchronous api call
*/

/*
I had given a test earlier on hackerrank.com 
where this api was given .
The api consist of 25 page and each page consist of Objects 
example : {
    page: 1,   // {2,3,4,5,6....25}
    per_page: 10,
    total: 250,
    total_pages: 25,
    data: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object], [Object]
    ]
  },
  .
  .
  .
And in these objects there is an array of objects i.e. data .
which has a key-value pair of name which is to be printed 
*/

let api = " https://jsonmock.hackerrank.com/api/countries?page=";

// As there is plenty of data so the function call has to be asynchronous
const hackerrank = async () => {
  let fetchArray = [];
  try {
    for (let i = 0; i < 25; i++) {
      /*  pushing all the names into a top-level array so 
          I had to push all the response to an array so that I can resolve 
          all the promises at the same time.
      */
      fetchArray.push(await fetch(`${api}` + (i + 1)));
    }

    let results = await Promise.all(fetchArray); // For dealing with multiple promises at the same time
    fetchArray.map((res) => console.log(res.status)); // checking for the status code, can be avoided
    let dataFromPromises = results.map((result) => result.json());
    let finalData = await Promise.all(dataFromPromises);
    return finalData; // returning final data
  } catch (error) {
    console.error(error);
  }
};
let resultArray = [];
// This is in an async funciton which will populate all the data in the resultArray
(async () => {
  let finalResults = await hackerrank();
  finalResults.map(({ data }) => {
    // data is nested into array of objects
    data.map(({ name }) => {
      resultArray.push(name);
    });
  });
  console.log(resultArray); //printing all the country names
})();
