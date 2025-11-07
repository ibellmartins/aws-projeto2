import fetch from "node-fetch"; 

export const handler = async () => {
  try {
    const response = await fetch("https://9txo2253n3.execute-api.us-east-1.amazonaws.com");
    const books = await response.json();

    const totalBooks = books.length;
    const totalPrice = books.reduce((sum, b) => sum + parseFloat(b.price), 0);
    const avgPrice = totalBooks ? (totalPrice / totalBooks).toFixed(2) : 0;

    return {
      statusCode: 200,
      body: JSON.stringify({
        totalBooks,
        totalPrice,
        avgPrice,
        lastUpdate: new Date().toISOString(),
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

/*
  handler()
    .then(result => console.log(result))
    .catch(console.error);
*/