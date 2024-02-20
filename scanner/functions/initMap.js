function initMap(options) {
  default_options = {
    type: 'Feature',
    properties: {
      umap_id: 42,
      datalayers: [],
      urls: {
        map: '/map/{slug}_{pk}',
        datalayer_view: '/datalayer/{pk}/',
        map_update: '/map/{map_id}/update/settings/',
        map_old_url: '/map/{username}/{slug}/',
        map_clone: '/map/{map_id}/update/clone/',
        map_short_url: '/m/{pk}/',
        map_anonymous_edit_url: '/map/anonymous-edit/{signature}',
        map_new: '/map/new/',
        datalayer_update: '/map/{map_id}/datalayer/update/{pk}/',
        map_delete: '/map/{map_id}/update/delete/',
        map_create: '/map/create/',
        logout: '/logout/',
        datalayer_create: '/map/{map_id}/datalayer/create/',
        login_popup_end: '/login/popupd/',
        login: '/login/',
        datalayer_delete: '/map/{map_id}/datalayer/delete/{pk}/',
        datalayer_versions: '/map/{map_id}/datalayer/{pk}/versions/',
        datalayer_version: '/datalayer/{pk}/{name}',
        pictogram_list_json: '/pictogram/json/',
        map_update_permissions: '/map/{map_id}/update/permissions/',
        map_download: '/map/{map_id}/download/',
      },
      default_iconUrl: '../src/img/marker.svg',
      zoom: 6,
      share_statuses: [
        [1, 'Tout le monde (public)'],
        [2, 'Quiconque a le lien'],
        [3, 'Éditeurs uniquement'],
      ],
      tilelayers: [
        {
          attribution: '\u00a9 OSM Contributors',
          name: 'OpenStreetMap',
          url_template: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          minZoom: 0,
          maxZoom: 18,
          id: 1,
          selected: true,
        },
        {
          attribution: 'HOT and friends',
          name: 'HOT OSM-fr server',
          url_template: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
          rank: 99,
          minZoom: 0,
          maxZoom: 20,
          id: 2,
        },
      ],
      tilelayer: {
        attribution: 'HOT and friends',
        name: 'HOT OSM-fr server',
        url_template: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        rank: 99,
        minZoom: 0,
        maxZoom: 20,
        id: 2,
      },
      licences: {
        'No licence set': {
          url: '',
          name: 'No licence set',
        },
        'Licence ouverte/Open Licence': {
          url: 'http://www.data.gouv.fr/Licence-Ouverte-Open-Licence',
          name: 'Licence ouverte/Open Licence',
        },
        'WTFPL': {
          url: 'http://www.wtfpl.net/',
          name: 'WTFPL',
        },
        'ODbl': {
          url: 'http://opendatacommons.org/licenses/odbl/',
          name: 'ODbl',
        },
      },
      name: 'name of the map',
      description: 'The description of the map',
      locale: 'en',
      editMode: 'advanced',
      moreControl: true,
      scaleControl: true,
      miniMap: false,
      datalayersControl: true,
      displayCaptionOnLoad: false,
      displayPopupFooter: false,
      displayDataBrowserOnLoad: false,
      permissions: {
        share_status: 1,
        owner: {
          id: 1,
          name: 'ybon',
          url: '/en/user/ybon/',
        },
        editors: [],
      },
      user: {
        id: 1,
        name: 'foofoo',
        url: '/en/me',
      },
    },
  }
  options = options || {}
  options.properties = L.extend({}, default_options.properties, options)
  options.geometry = {
    type: 'Point',
    coordinates: [5.0592041015625, 52.05924589011585],
  }
  return new U.Map('map', options)
}