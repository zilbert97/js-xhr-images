class RandomImage {
  constructor(number) {
    this.imageList = axios.get(
      `https://picsum.photos/v2/list?limit=${number}`
    ).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
    });
  }
}


const myClass = RandomImage(50);
console.log(myClass.imageList);
