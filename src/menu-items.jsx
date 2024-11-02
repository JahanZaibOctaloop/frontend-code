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
          url: '/'
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
    // {
    //   id: 'ui-element',
    //   title: '',
    //   type: 'group',
    //   icon: 'icon-ui',
    //   children: [
    //     {
    //       id: 'component',
    //       title: 'Component',
    //       type: 'collapse',
    //       icon: 'feather icon-box',
    //       children: [
    //         {
    //           id: 'button',
    //           title: 'Button',
    //           type: 'item',
    //           url: '/basic/button'
    //         },
    //         {
    //           id: 'badges',
    //           title: 'Badges',
    //           type: 'item',
    //           url: '/basic/badges'
    //         },
    //         {
    //           id: 'breadcrumb',
    //           title: 'Breadcrumb & Pagination',
    //           type: 'item',
    //           url: '/basic/breadcrumb-paging'
    //         },
    //         {
    //           id: 'collapse',
    //           title: 'Collapse',
    //           type: 'item',
    //           url: '/basic/collapse'
    //         },
    //         {
    //           id: 'tabs-pills',
    //           title: 'Tabs & Pills',
    //           type: 'item',
    //           url: '/basic/tabs-pills'
    //         },
    //         {
    //           id: 'typography',
    //           title: 'Typography',
    //           type: 'item',
    //           url: '/basic/typography'
    //         }
    //       ]
    //     }
    //   ]
    // },
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
