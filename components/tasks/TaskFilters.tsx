import React, { useMemo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import useTaskStore, { TaskStore } from '~/store/taskStore';
import { TaskStatus } from '~/types/task';

const TaskFilters = () => {
  const filter = useTaskStore((state: TaskStore) => state.filter);
  const setFilter = useTaskStore((state: TaskStore) => state.setFilter);

const filterOptions = useMemo(() => ['All', 'Pending', 'In Progress', 'Completed'] as const, []);


  const handleFilterPress = useCallback(
    (newFilter: TaskStatus | 'All') => {
      setFilter(newFilter);
    },
    [setFilter]
  );

  return (
    <View style={styles.filterContainer}>
      {filterOptions.map((filterOption) => (
        <TouchableOpacity
          key={filterOption}
          onPress={() => handleFilterPress(filterOption)}
          style={[styles.filterButton, filter === filterOption && styles.activeFilterButton]}>
          <Text style={[styles.filterText, filter === filterOption && styles.activeFilterText]}>
            {filterOption}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
  },
  activeFilterButton: {
    backgroundColor: '#E3F2FD',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
  },
  activeFilterText: {
    color: '#1976D2',
    fontWeight: '500',
  },
});

export default React.memo(TaskFilters);
