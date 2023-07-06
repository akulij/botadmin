import {useEffect, useState} from 'react';
import './Statistics.css'
import VerticalBars, {BarData} from './VerticalBars'
import axios from 'axios';

const newUsers: BarData = {
    chart_name: 'Новых пользователей в день',
    labels: ['13', '14', '15', '16'],
    data: [0, 0, 0, 0],
}

const totalUsers: BarData = {
    chart_name: 'Всего пользователей',
    labels: ['13', '14', '15', '16'],
    data: [0, 0, 0, 0],
}

const activeUsersDay: BarData = {
    chart_name: 'Активных пользователей в день',
    labels: ['13', '14', '15', '16'],
    data: [0, 0, 0, 0],
}

const activeUsers24h: BarData = {
    chart_name: 'Активных пользователей за последние сутки',
    labels: ['1ч', '6ч', '12ч', '24ч'],
    data: [0, 0, 0, 0],
}

const getStaticstics = async () => {
    // return data
    let {protocol, hostname, port} = location;
    port = "8000";
    const messages = await axios.get(`${protocol}//${hostname}:${port}/api/statistics`)
                                .catch((e) => {console.log(e)})
    if (messages) {
      console.log(messages.status)
      return messages.data
    }
    else {
        return {}
    }
}

function Statistics() {
    const [statistics, setStatistics] = useState<BarData[]>([newUsers, totalUsers, activeUsersDay, activeUsers24h])

  useEffect(() => {
      (async () => {
          const stat = await getStaticstics();
          setStatistics([
              {
                  chart_name: newUsers.chart_name,
                  labels: (stat.new_users as Array<{day: number, users: string[]}>).slice(0).reverse().map((v) => v.day.toString()),
                  data: (stat.new_users as Array<{day: number, users: string[]}>).slice(0).reverse().map(v => v.users.length),
              },
              {
                  chart_name: totalUsers.chart_name,
                  labels: (stat.total_users as Array<{day: number, users: number}>).slice(0).reverse().map((v) => v.day.toString()),
                  data: (stat.total_users as Array<{day: number, users: number}>).slice(0).reverse().map(v => v.users),
              },
              {
                  chart_name: activeUsersDay.chart_name,
                  labels: (stat.active_users_day as Array<{day: number, users: number}>).slice(0).reverse().map((v) => v.day.toString()),
                  data: (stat.active_users_day as Array<{day: number, users: number}>).slice(0).reverse().map(v => v.users),
              },
              {
                  chart_name: activeUsers24h.chart_name,
                  labels: (stat.active_users_24h as Array<{day: number, users: number}>).map((v) => v.day.toString()),
                  data: (stat.active_users_24h as Array<{day: number, users: number}>).map(v => v.users),
              },
          ]);
      })();
  }, [])

  return (
      <div className='stat_holder'>
          {/* <div className='join_sources'>In dev, здесь будет селектор статистики...</div> */}
          <div className='stat_container'>
              <div className='statistics_wrapper'>
                  <VerticalBars data={statistics[0]}></VerticalBars>
                  <VerticalBars data={statistics[1]}></VerticalBars>
                  <VerticalBars data={statistics[2]}></VerticalBars>
                  <VerticalBars data={statistics[3]}></VerticalBars>
              </div>
          </div>
      </div>
  )
}

export default Statistics
