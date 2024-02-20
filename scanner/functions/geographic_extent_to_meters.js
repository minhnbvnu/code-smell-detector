function geographic_extent_to_meters(extent) {
        const [g_xmin, g_ymin, g_xmax, g_ymax] = extent;
        const [m_xmin, m_ymin] = geographic_to_meters(g_xmin, g_ymin);
        const [m_xmax, m_ymax] = geographic_to_meters(g_xmax, g_ymax);
        return [m_xmin, m_ymin, m_xmax, m_ymax];
    }