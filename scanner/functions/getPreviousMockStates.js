function getPreviousMockStates() {
  var states = [];
  states.push({ name: 'aside1', url: '/aside1'});
  states.push({ name: 'aside2', url: '/aside2'});

  // Root of main app states
  states.push({ name: 'top' });

  // Personnel tab
  states.push({ name: 'top.people', url: 'people'  });
  states.push({ name: 'top.people.managerlist', url: '/managers'});
  states.push({ name: 'top.people.manager', url: '/manager/:mid'});
  states.push({ name: 'top.people.manager.emplist', url: '/emps'});
  states.push({ name: 'top.people.manager.emp', url: '/emp/:eid'});

  // Inventory tab
  states.push({ name: 'top.inv', url: 'inv' });
  states.push({ name: 'top.inv.storelist', url: '/stores'});
  states.push({ name: 'top.inv.store', url: '/store/:sid'});
  states.push({ name: 'top.inv.store.productlist', url: '/products'});
  states.push({ name: 'top.inv.store.product', url: '/product/:pid'});

  // Customer tab
  states.push({ name: 'top.cust', url: 'cust' });
  states.push({ name: 'top.cust.customerlist', url: '/customers'});
  states.push({ name: 'top.cust.customer', url: '/customer/:cid'});
  states.push({ name: 'top.cust.customer.orderlist', url: '/orders'});
  states.push({ name: 'top.cust.customer.order', url: '/order/:oid'});

  return states;
}