import NetWorth from "../components/NetWorth";

const HomePage = () => {
  const userAddress =
    "0x77f5248f6d3205a752651121853b2a4e43eedc5398d0cc58216810742c767888"; // Replace with dynamic data

  return (
    <div className="py-auto mx-auto">
      <h1> </h1>
      <NetWorth address={userAddress} />
    </div>
  );
};

export default HomePage;
