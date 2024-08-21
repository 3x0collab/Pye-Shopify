import React, { useState, useEffect,useCallback, useRef } from 'react';
import {  Card, Button, Spinner, TextContainer,
Banner } from '@shopify/polaris';
import { useLoaderData } from "@remix-run/react";


import { authenticate } from "../shopify.server";
import {  fetchPaginatedData } from "../gql_query";


export const loader = async ({ request }) => {
    const { admin } = await authenticate.admin(request);
 console.log('were here boss')
  return {
    customers:await fetchPaginatedData(admin,'Customers') || [],
    // discount:await discount.json(),
  }


};








const DataLoader = ({isTraining,isTrainingComplete,submitTrain}) => {

  const {customers} = useLoaderData()
 // console.log('discount', discount.data.codeDiscountNodes.pageInfo)
 // console.log('shit',responseJson.data.customers.edges)

useEffect(()=>{

submitTrain({customers})
},[JSON.stringify(customers)])
   

  return (
    <Card>
           {isTraining && !isTrainingComplete && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Spinner size="large" />
          <p>Training is in progress. Please wait...</p>
        </div>
      )}
    </Card>
  );
};

export default DataLoader;
