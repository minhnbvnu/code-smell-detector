function meters_extent_to_geographic(extent) {
        const [m_xmin, m_ymin, m_xmax, m_ymax] = extent;
        const [g_xmin, g_ymin] = meters_to_geographic(m_xmin, m_ymin);
        const [g_xmax, g_ymax] = meters_to_geographic(m_xmax, m_ymax);
        return [g_xmin, g_ymin, g_xmax, g_ymax];
    }