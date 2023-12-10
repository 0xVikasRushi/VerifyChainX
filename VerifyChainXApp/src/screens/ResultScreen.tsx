import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { AppStackScreenProps } from "../types";
import { Text } from "native-base";
import { calculateVotes } from "../shared/api";
import { BarChart } from "react-native-chart-kit";

type ResultScreenProps = AppStackScreenProps<"ResultScreen">;

type VotingResultsType = {
  [key: string]: {
    QVotingRatio: number;
    totalVotes: number;
  };
};
const ResultScreen: React.FC<ResultScreenProps> = ({ route }) => {
  useEffect(() => {
    getQVotingResults();
  }, []);

  const [results, setResults] = useState<VotingResultsType>({});

  const eventid = route.params.event_id;

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const arr = results ? Object.values(results) : [];
  const ratioARR = arr.map((e) => e.QVotingRatio * 100);

  const data1 = {
    labels: Object.keys(results),
    datasets: [
      {
        data: ratioARR,
      },
    ],
  };
  console.log(data1);

  const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };

  const getQVotingResults = async () => {
    const res: VotingResultsType = await calculateVotes(eventid);
    // ? SAMPLE RES: {"New Aadhar Endpoints": {"QVotingRatio": 0.01890768638674219, "totalVotes": 2}, "SSO Login": {"QVotingRatio": 0.7920154497458359, "totalVotes": 48}, "Timestamp RSA FIXES": {"QVotingRatio": 0.18907686386742192, "totalVotes": 20}}
    setResults(res);
  };
  return (
    <View>
      <Text color="black">ResultScreen{eventid}</Text>
      {data1 && (
        <BarChart
          data={data1}
          width={300}
          height={220}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726",
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          verticalLabelRotation={30}
        />
      )}
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({});
