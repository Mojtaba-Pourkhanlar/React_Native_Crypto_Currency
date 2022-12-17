import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import CoinID from "./screen/CoinID";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [coins, setCoins] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false",
      );
      setCoins(data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FFE81C" />
      ) : (
        <FlatList
          style={styles.list}
          data={coins}
          renderItem={({ item }) => <CoinID coin={item} />}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0D1024",
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  header: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  list: {
    width: "90%",
  },
});
