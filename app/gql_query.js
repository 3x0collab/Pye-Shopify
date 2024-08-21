export  const customer_query = `query {
  customers(first: 2) {
           pageInfo {
            hasNextPage,endCursor
           },
    edges {
      node {
        id,
        addresses {
          address1,city,country,countryCodeV2
        },
        amountSpent {
          amount,
          currencyCode
        },
        companyContactProfiles {
             company {
                    contactsCount {count}, createdAt,externalId,mainContact {
                      customer {firstName, lastName,email}
                    },locationsCount {
                      count}
                      ,name,note,
                    ordersCount {count},
                    totalSpent {amount,currencyCode}
                  },
        },
     
        createdAt,defaultAddress {
             address1,city,country,countryCodeV2
           },
           firstName, lastName,email,image {
            url
           },numberOfOrders,phone,tags,validEmailAddress,verifiedEmail
      }
    }
  }
}`


export const discount_code = `query {
  codeDiscountNodes(first: 200) {

        pageInfo {
            hasNextPage,endCursor
           },
    nodes {
      id
      codeDiscount {
        ... on DiscountCodeBasic {
          title,
          summary, codesCount {count},
          createdAt,customerGets {
            appliesOnOneTimePurchase,appliesOnSubscription
          },
            startsAt,status
        }
        ... on DiscountCodeBxgy {
          title,
         summary, codesCount {count},
          createdAt,customerGets {
            appliesOnOneTimePurchase,appliesOnSubscription,
            
          },startsAt,status
        } 
      }
    }
  }
}`




export const get_query  = (name) => {
  switch (name){
  case "Customers":{
    return customer_query
  }
default:{
  return customer_query
}
  }

}

 
const value_map = {
  Customers:'customers'
}



export async function fetchPaginatedData(admin, query) {

   const resources = localStorage.getItem('selectedResources')
  const allData = [];

   if ( resources && JSON.parse(resources).includes(query) ){


     let hasNextPage = true;
  let endCursor = null;
  const maxPages = 100; // Limit to prevent infinite loops
  let pageCount = 0;

  while (hasNextPage && pageCount < maxPages) {
    try {
      const response = await admin.graphql(`
        ${get_query(query, endCursor)}
      `);
      const res = await response.json();

    

      const { edges, pageInfo } = res.data[value_map[query]];
      allData.push(...edges.map(edge => edge.node));

      hasNextPage = pageInfo.hasNextPage;
      endCursor = pageInfo.endCursor;
      pageCount++;
    } catch (error) {
      console.error('Error fetching paginated data:', error);
      break; // Exit loop on error
    }
  }

  
   }

 

  return allData;
}

