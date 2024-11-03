const menuItems = {
  items: [
    {
      id: 'navigation',
      title: '',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: 'feather icon-home',
          url: '/dashboard'
        }
      ]
    },
    {
      id: 'navigation',
      title: 'Add Record',
      type: 'group',
      icon: 'icon-navigation',
      children: [
        {
          id: 'Add Record',
          title: 'Add Record',
          type: 'item',
          icon: 'feather icon-home',
          url: '/forms/form-basic'
        }
      ]
    },
   
    {
      id: 'ui-forms',
      title: 'All Record',
      type: 'group',
      icon: 'icon-group',
      children: [
        {
          id: 'forms',
          title: 'All Record of Gaurd',
          type: 'item',
          icon: 'feather icon-file-text',
          url: '/tables/bootstrap'
        },
       
      ]
    },
   
  ]
};

export default menuItems;
