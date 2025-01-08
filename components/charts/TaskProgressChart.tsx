import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import useTaskStore from '~/store/taskStore';
import { TaskStatus } from '~/types/task';

const TaskProgressChart: React.FC = () => {
  const { tasks } = useTaskStore();

  // cunt tasks by status
  const taskCounts = tasks.reduce(
    (acc, task) => {
      acc[task.status]++;
      return acc;
    },
    { Completed: 0, 'In Progress': 0, Pending: 0 } as Record<TaskStatus, number>
  );

  const chartData = [
    {
      name: 'Completed',
      count: taskCounts.Completed,
      color: '#4CAF50',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'In Progress',
      count: taskCounts['In Progress'],
      color: '#FFC107',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
    {
      name: 'Pending',
      count: taskCounts.Pending,
      color: '#F44336',
      legendFontColor: '#000',
      legendFontSize: 14,
    },
  ];

  return (
    <View style={styles.container}>
      {/* Centered PieChart */}
      <View style={styles.chartContainer}>
        <PieChart
          data={chartData}
          width={Dimensions.get('window').width - 32} 
          height={200}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          accessor="count"
          backgroundColor="transparent"
          paddingLeft="80"
          absolute
          hasLegend={false} 
          center={[0, 0]} 
          avoidFalseZero
          style={styles.chart}
        />
      </View>

   
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center', 
  },
  chartContainer: {
    justifyContent: 'center', 
    alignItems: 'center', 
 
  },
  chart: {
    borderRadius: 8,
    
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 14,
    color: '#000',
  },
});

export default TaskProgressChart;
