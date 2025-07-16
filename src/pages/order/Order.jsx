import React, { useContext } from 'react'
import Layout from '../../components/layout/Layout'
import myContext from '../../context/data/MyContext'

const Order = () => {
    const context = useContext(myContext);
    
  return (
    <Layout>
        order
    </Layout>
  )
}

export default Order