"use client";

import React, { useEffect, useState } from "react";
import { getAPRData } from "../services/aptos";

const APR: React.FC = () => {
  const [apr, setApr] = useState<number | null>(null);

  useEffect(() => {
    const fetchAPR = async () => {
      // const aprData = await getAPRData();
      // setApr(aprData);
    };

    fetchAPR();
  }, []);

  return (
    <div>
      <h2>Current APR</h2>
      <p>{apr !== null ? `${apr}%` : "Loading..."}</p>
    </div>
  );
};

export default APR;
