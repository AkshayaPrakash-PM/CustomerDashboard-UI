export const processData = (rawData, selectedProduct) => {
  if (!selectedProduct) return null;
  const rows = Array.isArray(rawData) ? rawData : [];

  // Filter rows by product
  const byProduct = rows.filter(r => (r?.Product || '').trim() === selectedProduct);

  // Segment counts
  const countBy = (segment) => byProduct.filter(r => (r?.SalesSegment || '').trim() === segment).length;
  const segmentCounts = {
    S500: countBy('S500'),
    Major: countBy('Major'),
    SMB: countBy('SMB'),
  };

  // S500 subset
  const s500 = byProduct.filter(r => (r?.SalesSegment || '').trim() === 'S500');

  // Concerns (ICM Feedback Description)
  const concernsRaw = s500
    .filter(r => (r['ICM Feedback Description'] || '').trim())
    .map(r => ({
      tenantId: r['Tenant ID'],
      concern: r['ICM Feedback Description'].trim(),
      status: (r['ICM Status (In SLA/Out of SLA)'] || 'Unknown').trim(),
    }));
  const topConcerns = Array.from(new Map(concernsRaw.map(c => [c.concern, c])).values()).slice(0, 5);

  // Positive feedback (OCV Feedback Text)
  const feedbackRaw = s500
    .filter(r => (r['OCV Feedback Text'] || '').trim())
    .map(r => ({
      tenantId: r['Tenant ID'],
      feedback: r['OCV Feedback Text'].trim(),
    }));
  const topPositive = Array.from(new Map(feedbackRaw.map(f => [f.feedback, f])).values()).slice(0, 5);

  // ICM severity from Status proxy
  const sev1 = s500.filter(r => (r['ICM Status (In SLA/Out of SLA)'] || '').trim() === 'Out of SLA').length;
  const sev2 = s500.filter(r => (r['ICM Status (In SLA/Out of SLA)'] || '').trim() === 'In SLA').length;
  const sev3 = Math.max(0, Math.round(s500.length * 0.1)); // demo bucket
  const icmSeverity = { 'Sev 1': sev1, 'Sev 2': sev2, 'Sev 3': sev3 };

  // Insights KPIs (demo)
  const insights = [
    { metric: 'User satisfaction', value: '87%', change: '+5%' },
    { metric: 'Adoption rate', value: '73%', change: '+12%' },
    { metric: 'Support tickets', value: '42', change: '-8%' },
    { metric: 'Time to resolution', value: '3.2 days', change: '-15%' },
  ];

  // Details for dialogs
  const concernsDetails = concernsRaw.map(item => ({
    tenantId: item.tenantId,
    customerName: `Customer ${String(item.tenantId || '').substring(0, 8)}`,
    concern: item.concern,
    status: item.status,
    dateReported: new Date().toISOString().split('T')[0],
  }));

  const feedbackDetails = feedbackRaw.map(item => ({
    tenantId: item.tenantId,
    customerName: `Customer ${String(item.tenantId || '').substring(0, 8)}`,
    feedback: item.feedback,
    dateReceived: new Date().toISOString().split('T')[0],
    sentimentScore: (Math.random() * 2 + 3).toFixed(1),
  }));

  const icmDetails = s500
    .filter(r => (r['ICM Status (In SLA/Out of SLA)'] || '').trim())
    .map(r => ({
      icmId: `ICM-${Math.floor(Math.random() * 100000)}`,
      tenantId: r['Tenant ID'],
      customerName: `Customer ${String(r['Tenant ID'] || '').substring(0, 8)}`,
      description: (r['ICM Feedback Description'] || 'No description provided').trim(),
      severity: ((r['ICM Status (In SLA/Out of SLA)'] || '').trim() === 'In SLA') ? 'Sev 2' : 'Sev 1',
      openDate: new Date().toISOString().split('T')[0],
      durationOpen: `${Math.floor(Math.random() * 14) + 1} days`,
    }));

  const segmentDetails = {
    S500: byProduct.filter(r => (r?.SalesSegment || '').trim() === 'S500').map(r => ({
      tenantId: r['Tenant ID'],
      customerName: `Customer ${String(r['Tenant ID'] || '').substring(0, 8)}`,
      product: r.Product,
      subscriptionType: 'Enterprise',
    })),
    Major: byProduct.filter(r => (r?.SalesSegment || '').trim() === 'Major').map(r => ({
      tenantId: r['Tenant ID'],
      customerName: `Customer ${String(r['Tenant ID'] || '').substring(0, 8)}`,
      product: r.Product,
      subscriptionType: 'Business Premium',
    })),
    SMB: byProduct.filter(r => (r?.SalesSegment || '').trim() === 'SMB').map(r => ({
      tenantId: r['Tenant ID'],
      customerName: `Customer ${String(r['Tenant ID'] || '').substring(0, 8)}`,
      product: r.Product,
      subscriptionType: 'Business Standard',
    })),
  };

  const insightsDetails = {
    userSatisfaction: [
      { month: 'Jan', value: 78 },
      { month: 'Feb', value: 80 },
      { month: 'Mar', value: 79 },
      { month: 'Apr', value: 82 },
      { month: 'May', value: 85 },
      { month: 'Jun', value: 87 },
    ],
    adoption: [
      { month: 'Jan', value: 45 },
      { month: 'Feb', value: 52 },
      { month: 'Mar', value: 59 },
      { month: 'Apr', value: 64 },
      { month: 'May', value: 68 },
      { month: 'Jun', value: 73 },
    ],
    supportTickets: [
      { month: 'Jan', value: 65 },
      { month: 'Feb', value: 58 },
      { month: 'Mar', value: 52 },
      { month: 'Apr', value: 48 },
      { month: 'May', value: 45 },
      { month: 'Jun', value: 42 },
    ],
    timeToResolution: [
      { month: 'Jan', value: 5.1 },
      { month: 'Feb', value: 4.8 },
      { month: 'Mar', value: 4.2 },
      { month: 'Apr', value: 3.9 },
      { month: 'May', value: 3.5 },
      { month: 'Jun', value: 3.2 },
    ],
  };

  return {
    segmentCounts,
    topConcerns,
    topPositive,
    icmSeverity,
    insights,
    concernsDetails,
    feedbackDetails,
    icmDetails,
    segmentDetails,
    insightsDetails,
  };
};