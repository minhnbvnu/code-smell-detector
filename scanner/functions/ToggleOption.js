function ToggleOption({ children, filter, activeFilters, setFilters }) {
    return (
        <button
            className={
                'toggle__option ' + (activeFilters[filter] ? 'is-toggled' : '')
            }
            onClick={() =>
                setFilters({
                    ...activeFilters,
                    [filter]: !activeFilters[filter]
                })
            }
        >
            {children}
        </button>
    );
}